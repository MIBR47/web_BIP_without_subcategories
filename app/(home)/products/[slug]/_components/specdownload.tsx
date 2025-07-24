'use client';
import FileDownloader from '@/components/filedownloader';

interface spectoDownloadProps {
  fileUrl: string;
  filename: string;
  title: string;
}

const spectoDownload = ({ fileUrl, filename, title }: spectoDownloadProps) => {
  return (
    <div>
      <FileDownloader fileUrl={fileUrl} filename={filename} title={title} />
    </div>
  );
};
export default spectoDownload;
