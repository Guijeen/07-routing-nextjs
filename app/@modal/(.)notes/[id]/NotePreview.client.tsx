"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal"; // Шлях до вашого компонента Modal
import css from "./NotePreview.module.css"; // Ваші стилі для деталей нотатки

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return null;
  if (error || !note) return null;

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={css.previewContainer}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>

        <button className={css.closeBtn} onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
