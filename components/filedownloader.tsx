import useDownloader from 'react-use-downloader';
import { Badge } from './ui/badge';
// import {Button} from '@/components/ui/button'

interface FileDownloaderProps {
  fileUrl: string;
  filename: string;
  title: string;
}

const FileDownloader: React.FC<FileDownloaderProps> = ({
  fileUrl,
  filename,
  title,
}) => {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();

  //   const fileUrl = '/File.pdf';
  //   const filename = 'File.pdf';

  return (
    <div className='downloader cursor-pointer h-30'>
      <Badge
        variant='outline'
        color='info'
        onClick={() => download(fileUrl, filename)}
        className='text-sm px-4 py-2'
      >
        {title}
      </Badge>
    </div>
  );
};
export default FileDownloader;
