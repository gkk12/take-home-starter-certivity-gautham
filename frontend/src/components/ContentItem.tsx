import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { HtmlEntity } from '../types/HtmlEntity';
import CommentSection from '../components/CommentSection';

type ContentItemProps = {
  content: HtmlEntity;
};

const ContentItem: React.FC<ContentItemProps> = ({ content }) => {
  const renderHtmlContent = (html: string) => {
    return ReactHtmlParser(html, {
      transform: (node, index) => {
        if (node.type === 'tag' && node.name === 'a' && node.attribs && node.attribs.href) {
          const href = node.attribs.href;
          const textContent = extractTextContent(node);
          return (
            <a key={index} href={`https://en.wikipedia.org/${href}`} target="_blank" rel="noopener noreferrer">
              {textContent}
            </a>
          );
        }
      }
    });
  };

  const extractTextContent = (node: any): string => {
    if (node.type === 'text') {
      return node.data || '';
    } else if (node.children && Array.isArray(node.children)) {
      return node.children.map((child: any) => extractTextContent(child)).join('');
    } else {
      return '';
    }
  };

  return (
    <div className="mb-4">
      {renderHtmlContent(content.html)}
      <CommentSection contentId={content.id} />
    </div>
  );
};

export default ContentItem;