import JoditEditor from "jodit-react";
import { useRef } from "react";


const Editor = ({ content, setContent }: any) => {
    const editor = useRef(null);

    return (
        <div className="my-4 text-black">
            <JoditEditor
                ref={editor}
                value={content}
                name="content"
                config={{
                    askBeforePasteHTML: false,
                    readonly: false,
                    height: 500,
                    placeholder: "Write your Content here...",
                    toolbarAdaptive: false,
                    buttons: [
                        "bold", "italic", "underline", "|",
                        "ul", "ol", "|",
                        "font", "fontsize", "brush", "|",
                        "link", "image", "table", "|",
                        "align", "undo", "redo"
                    ],

                }}
                onBlur={(newContent) => {
                    return setContent((prev: any) => ({
                        name: prev.name,
                        content: newContent,
                    }));
                }
                }
            />
        </div>
    );
};

export default Editor;
