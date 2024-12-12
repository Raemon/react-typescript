import React, { useEffect, useRef } from 'react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

interface EditorProps {
  storageKey?: string;
  initialValue?: string;
  onChange?: (data: string) => void;
  config?: Record<string, unknown>;
  v?: number;
}

interface EditorInstance {
  destroy: () => Promise<void>;
  getData: () => string;
  setData: (data: string) => void;
  model: {
    document: {
      on: (event: string, callback: () => void) => void;
    };
  };
}

const Editor = ({v=0,storageKey = 'ckeditor-content',initialValue = '',onChange,config = {}}:EditorProps) => {
  const editorRef = useRef<EditorInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const orgText = JSON.stringify(orgData, null, 4);

  useEffect(() => {
    let editor: EditorInstance | null = null;

    const initEditor = async () => {
      if (!containerRef.current) return;

      try {
        editor = await BalloonEditor.create(containerRef.current, {
          ...config,
          placeholder: 'Write your content here...',
          initialData: orgText,
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzQyMjA3OTksImp0aSI6ImFhNmE0NGM5LWJkODUtNDM1Mi05MzZiLTQzODczYTRlZjkzYyIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJkaXN0cmlidXRpb25DaGFubmVsIjpbInNoIiwiZHJ1cGFsIl0sIndoaXRlTGFiZWwiOnRydWUsImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIiwiUkUiLCJSQ01UIiwiUlRDIl0sInZjIjoiYTc0N2NhOWQifQ.NxsZnamH1gIzu4Jwm4QlQOlqOoIjbd3jKpUW0MAElyfFbmDV7ni_23aP4stpl8v3cddiN3d6RtV8aXuD2DeIlA'
        }) as EditorInstance;
        
        editorRef.current = editor;

        if (!editor) {
          throw new Error('CKEditor failed to initialize');
        }

        // Load initial content from localStorage or props
        const savedContent = localStorage.getItem(storageKey);
        const contentToLoad = savedContent ?? initialValue;
        
        if (contentToLoad) {
          editor.setData(contentToLoad);
        }

        // Set up change handler
        editor.model.document.on('change:data', () => {
          if (!editor) return;
          const data = editor.getData();
          localStorage.setItem(storageKey, data);
          onChange?.(data);
        });
      } catch (error) {
        console.error('CKEditor initialization failed:', error);
      }
    };

    initEditor();

    return () => {
      if (editor) {
        editor.destroy()
          .catch(error => {
            console.error('Error destroying CKEditor instance:', error);
          });
      }
    };
  }, [config, initialValue, onChange, storageKey]);

  return (
    <PageLayout v={v}>
      <div className="w-full">
        <div 
          ref={containerRef}
          className="min-h-[200px] border rounded-md w-[640px] focus:outline-none"
        />
      </div>
    </PageLayout>
  );
};

export default Editor;