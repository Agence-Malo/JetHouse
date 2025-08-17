import Image from "next/image";
import { JSX } from "react";

const renderLexicalContent = (content: any): JSX.Element | null => {
  if (
    !content ||
    !content.root ||
    !Array.isArray(content.root.children) ||
    content.root.children.length === 0
  ) {
    return <p className="text-gray-500">No content available.</p>;
  }

  const renderNode = (node: any, index: number): JSX.Element | null => {
    if (!node) return null;

    switch (node.type) {
      case "heading":
        return (
          <h1 key={index} className="text-3xl font-bold my-4">
            {node.children?.map(renderLeaf)}
          </h1>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-4">
            {node.children?.map(renderLeaf)}
          </p>
        );
      case "blockquote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-gray-400 pl-4 italic my-4"
          >
            {node.children?.map(renderLeaf)}
          </blockquote>
        );
      case "ul":
        return (
          <ul key={index} className="list-disc ml-6">
            {node.children?.map(renderNode)}
          </ul>
        );
      case "ol":
        return (
          <ol key={index} className="list-decimal ml-6">
            {node.children?.map(renderNode)}
          </ol>
        );
      case "li":
        return <li key={index}>{node.children?.map(renderLeaf)}</li>;
      case "link":
        return (
          <a
            key={index}
            className="underline text-blue-600 hover:text-blue-800"
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {node.children?.map(renderLeaf)}
          </a>
        );
      case "upload":
        return (
          <Image
            key={index}
            src={encodeURI(
              `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${node.value.url}`,
            )}
            alt={node.value.alt || ""}
            width={800}
            height={400}
            className="w-full object-cover my-4 rounded-lg"
          />
        );
      default:
        return null;
    }
  };

  const renderLeaf = (leaf: any, index?: number) => {
    if (!leaf.text) return null;
    return (
      <span
        key={index}
        className={`${leaf.bold ? "font-bold" : ""} ${leaf.italic ? "italic" : ""} ${
          leaf.underline ? "underline" : ""
        } ${leaf.strikethrough ? "line-through" : ""}`}
      >
        {leaf.text}
      </span>
    );
  };

  return <div>{content.root.children.map(renderNode)}</div>;
};

export default renderLexicalContent;
