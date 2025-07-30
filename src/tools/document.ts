import axios from 'axios';

interface DocumentInfo {
  content: string;
  fileType: string;
  fileName: string;
}

export async function fetchDocumentFromDropbox(url: string): Promise<DocumentInfo> {
  try {
    // Convert shared link to direct download link
    const downloadUrl = url.replace('dl=0', 'dl=1');
    
    const response = await axios.get(downloadUrl, {
      responseType: 'arraybuffer'
    });

    // Get filename from Content-Disposition header if available
    const contentDisposition = response.headers['content-disposition'];
    const fileName = contentDisposition
      ? contentDisposition.split('filename=')[1].replace(/["']/g, '')
      : 'document';

    // Determine file type from Content-Type header
    const fileType = response.headers['content-type'];

    // Convert buffer to string
    const content = response.data.toString('utf-8');

    return {
      content,
      fileType,
      fileName
    };
  } catch (error) {
    throw new Error(`Failed to fetch document: ${error.message}`);
  }
}

// Function to extract text content from different document types
export function extractTextContent(documentInfo: DocumentInfo): string {
  // Here you can add more sophisticated document parsing based on file type
  // For now, we'll return the raw content
  return documentInfo.content;
}
