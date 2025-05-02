'use client';

import {
  BoldIcon,
  HeadingIcon,
  ItalicIcon,
  OrderedListIcon,
  QuoteIcon,
  StrikethroughIcon,
  UnorderedListIcon,
} from './icons';
import { ImageIcon } from './icons/EditorToolbarIcons';

type EditorToolbarType = {
  onExecute: (prefix: string, postfix: string, comm: string) => void;
};

export default function EditorToolbar({ ...props }: EditorToolbarType) {
  const executeCommand = (
    comm:
      | 'heading'
      | 'bold'
      | 'italic'
      | 'strikethrough'
      | 'quote'
      | 'code'
      | 'link'
      | 'unordered-list'
      | 'ordered-list'
      | 'image'
  ) => {
    switch (comm) {
      case 'heading':
        props.onExecute('# ', '', comm);
        break;
      case 'bold':
        props.onExecute('**', '**', comm);
        break;
      case 'italic':
        props.onExecute('_', '_', comm);
        break;
      case 'strikethrough':
        props.onExecute('~~', '~~', comm);
        break;
      case 'quote':
        props.onExecute('> ', '', comm);
        break;
      case 'code':
        props.onExecute('`', '`', comm);
        break;
      case 'link':
        props.onExecute('[', '](url)', comm);
        break;
      case 'unordered-list':
        props.onExecute('- ', '', comm);
        break;
      case 'ordered-list':
        props.onExecute('1. ', '', comm);
        break;
      case 'image':
        props.onExecute('![', '](url)', comm);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <li className="nav-item ms-auto">
        <button
          className="nav-link"
          title="Heading"
          onClick={() => executeCommand('heading')}
        >
          <HeadingIcon />
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Bold"
          onClick={() => executeCommand('bold')}
        >
          <BoldIcon />
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Italic"
          onClick={() => executeCommand('italic')}
        >
          <ItalicIcon />
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Strikethrough"
          onClick={() => executeCommand('strikethrough')}
        >
          <StrikethroughIcon />
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Quote"
          onClick={() => executeCommand('quote')}
        >
          <QuoteIcon />
        </button>
      </li>
      <li className="nav-item border-end">
        <a
          className="nav-link"
          title="Link"
          onClick={() => executeCommand('link')}
        ></a>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Ordered List"
          onClick={() => executeCommand('ordered-list')}
        >
          <OrderedListIcon />
        </button>
      </li>
      <li className="nav-item border-end">
        <button
          className="nav-link"
          title="Unordered List"
          onClick={() => executeCommand('unordered-list')}
        >
          <UnorderedListIcon />
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Image"
          onClick={() => executeCommand('image')}
        >
          <ImageIcon />
        </button>
      </li>
    </>
  );
}
