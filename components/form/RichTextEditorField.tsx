"use client";
import { FC, useEffect } from "react";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import MenuBar from "../../app/admin/products/_components/menubar";

interface RichTextEditorFieldProps {
    name: string;
    label: string;
    content: string;
    // value: string;
    onChange: (name: string, content: string) => void;
    // onChange: (name: string, value: string) => void;
}

const RichTextEditorField: FC<RichTextEditorFieldProps> = ({
    name,
    label,
    content,
    // value,
    onChange,
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3",
                    },
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
                alignments: ["left", "center", "right", "justify"],
            }),
            Highlight,
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "min-h-[156px] border rounded-md bg-white py-2 px-3",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(name, editor.getHTML());
        },
    });
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-1">
                {label}
            </label>
            <div>
                <MenuBar editor={editor} />
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default RichTextEditorField;
