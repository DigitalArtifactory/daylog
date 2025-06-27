'use client';

import {
  IconBold,
  IconHeading, IconItalic,
  IconLink,
  IconList,
  IconListNumbers,
  IconPhoto,
  IconQuote,
  IconStrikethrough
} from '@tabler/icons-react';

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
      <li className="nav-item">
        <button
          className="nav-link"
          title="Heading"
          onClick={() => executeCommand('heading')}
        >
          <IconHeading />
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Bold"
          onClick={() => executeCommand('bold')}
        >
          <IconBold />
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Italic"
          onClick={() => executeCommand('italic')}
        >
          <IconItalic />
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Strikethrough"
          onClick={() => executeCommand('strikethrough')}
        >
          <IconStrikethrough />
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Quote"
          onClick={() => executeCommand('quote')}
        >
          <IconQuote />
        </button>
      </li>
      <li className="nav-item border-end">
        <button
          className="nav-link"
          title="Link"
          onClick={() => executeCommand('link')}
        >
          <IconLink />
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Ordered List"
          onClick={() => executeCommand('ordered-list')}
        >
          <IconListNumbers />
        </button>
      </li>
      <li className="nav-item border-end">
        <button
          className="nav-link"
          title="Unordered List"
          onClick={() => executeCommand('unordered-list')}
        >
          <IconList />
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Image"
          onClick={() => executeCommand('image')}
        >
          <IconPhoto />
        </button>
      </li>
    </>
  );
}
