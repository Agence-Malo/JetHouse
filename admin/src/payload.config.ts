import {postgresAdapter} from "@payloadcms/db-postgres";
import {vercelBlobStorage} from '@payloadcms/storage-vercel-blob'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import path from 'path'
import {buildConfig, PayloadRequest} from 'payload'
import {fileURLToPath} from 'url'
import sharp from 'sharp'
import {Resend} from "resend";

import {Users} from './collections/Users'
import {Media} from './collections/Media'
import {Jet} from './collections/Jet'
import Email from "@/components/email";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    cors: ['https://jethouse.aero', 'https://www.jethouse.aero'],
    routes: {
        admin: '/',
        api: '/api',
    },
    endpoints: [{
        path: '/email',
        method: 'post',
        handler: async (req: PayloadRequest) => {
            const resend = new Resend(process.env.RESEND_API_KEY);
            const {error} = await resend.emails.send({
                from: `${req.query.name} <onboarding@resend.dev>`,
                to: `${process.env.MAIL_TO}`,
                subject: "Website Contact Request",
                react: Email({
                    name: `${req.query.name}`,
                    email: `${req.query.email}`,
                    tel: `${req.query.tel}`,
                    message: `${req.query.message}`
                })
            });
            if (error) {
                console.error(error);
                return Response.json({status: "500", message: error})
            } else return Response.json({status: "200"})
        }
    }],
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Media, Jet],
    upload: {
        limits: {
            fileSize: 5000000,
        },
    },
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.POSTGRES_URL,
        }
    }),
    sharp,
    plugins: [
        vercelBlobStorage({
            collections: {
                [Media.slug]: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
    ],
})
