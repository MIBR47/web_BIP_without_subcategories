"use client";
import { FC, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Extension } from "@tiptap/core";
import MenuBar from "../../app/admin/products/_components/menubar";

interface RichTextEditorFieldProps {
    name: string;
    label: string;
    content: string;
    onChange: (name: string, content: string) => void;
}

// ✅ Extension untuk handle tombol Tab (tambahkan 4 spasi)
const CustomTab = Extension.create({
    name: "customTab",

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                const { state, dispatch } = this.editor.view;
                const { tr } = state;
                const { from } = state.selection;

                dispatch(tr.insertText("    ", from)); // tambahkan 4 spasi
                return true;
            },

            'Shift-Tab': () => {
                const { state, dispatch } = this.editor.view;
                const { tr } = state;
                const { from } = state.selection;

                // cek apakah 4 karakter sebelumnya adalah spasi
                const prevText = state.doc.textBetween(from - 4, from, '\n');
                if (prevText === '    ') {
                    dispatch(tr.delete(from - 4, from));
                    return true;
                }
                return false;
            },
        };
    },
});

const RichTextEditorField: FC<RichTextEditorFieldProps> = ({
    name,
    label,
    content,
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
            CustomTab, // ✅ tambahkan extension tab
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "min-h-[156px] border rounded-md bg-white py-2 px-3 outline-none",
                spellCheck: "false",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(name, editor.getHTML());
        },
    });

    // ✅ Sync konten dari luar jika berubah
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) return null; // loading fallback

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
