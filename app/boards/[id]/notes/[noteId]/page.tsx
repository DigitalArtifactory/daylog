'use client';

import NavHeader from '@/components/NavHeader';
import NavMenu from '@/components/NavMenu';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { useEffect, useState } from 'react';

export default function Home() {
  const [editor, setEditor] = useState<EditorJS | null>(null);
  useEffect(() => {
    if (editor == null) {
      // const onChangeEditor = (api: API, event: BlockMutationEvent) => {
      //   api.saver.save().then((outputData) => {
      //     const content = JSON.stringify(outputData);
      //     setData('content', content);
      //   });
      // };
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
        },
        minHeight: 240,
        placeholder: 'Start writing here something...'
        // onChange: onChangeEditor,
      });
      setEditor(editor);
    }
  }, [editor]);

  return (
    <Page>
      <NavHeader></NavHeader>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader preTitle="Notes" title="How do you know she is a witch?">
          <div className="btn-list">
            <button className="btn btn-primary d-none d-sm-inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M14 4l0 4l-6 0l0 -4" />
              </svg>
              Save changes
            </button>
          </div>
        </PageHeader>
        <PageBody>
          <div className="container-xl">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-9">
                <div className="card">
                  <div className="card-body p-0 shadow-sm">
                    <img
                      className="card-img-top"
                      src="/samples/photos/search-bg.jpg"
                      alt="Book on the grass"
                    />
                  </div>
                  <div className="card-body">
                    <div id="editorjs"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageBody>
      </PageContainer>
      <PageFooter></PageFooter>
    </Page>
  );
}
