import type { GoogleDriveFile } from '../types';

export const listDriveFiles = async (accessToken: string): Promise<GoogleDriveFile[]> => {
  const query = encodeURIComponent("trashed = false and (mimeType = 'text/html' or mimeType = 'application/json' or mimeType contains 'image/' or name contains '.html' or name contains '.json')");
  const fields = encodeURIComponent('files(id, name, mimeType, modifiedTime, size, webViewLink, iconLink, thumbnailLink)');
  
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=modifiedTime desc&pageSize=50&fields=${fields}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Failed to fetch files from Google Drive (${response.status})`);
  }

  const data = await response.json();
  return (data.files || []) as GoogleDriveFile[];
};

export const uploadFileToDrive = async (
  accessToken: string,
  filename: string,
  content: string,
  mimeType: 'text/html' | 'application/json' | string = 'text/html',
  fileIdToUpdate?: string
): Promise<GoogleDriveFile> => {
  // If fileIdToUpdate is provided, update existing file content
  if (fileIdToUpdate) {
    const response = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files/${fileIdToUpdate}?uploadType=media`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': mimeType,
        },
        body: content,
      }
    );

    if (response.ok) {
      return (await response.json()) as GoogleDriveFile;
    }
    // If patch fails (e.g. file was deleted on drive), fallback to new upload
  }

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata = {
    name: filename,
    mimeType: mimeType,
    description: 'Auto-saved with Landing Page & Portal Suite on Google AI Studio',
  };

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}; charset=UTF-8\r\n\r\n` +
    content +
    closeDelimiter;

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,modifiedTime,size,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Failed to upload file to Google Drive (${response.status})`);
  }

  return (await response.json()) as GoogleDriveFile;
};

export const uploadBlobToDrive = async (
  accessToken: string,
  file: File
): Promise<GoogleDriveFile> => {
  const metadata = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
    description: 'Direct upload from Landing Page Suite',
  };

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json; charset=UTF-8' })
  );
  form.append('file', file);

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,modifiedTime,size,webViewLink,thumbnailLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Failed to upload binary file to Google Drive (${response.status})`);
  }

  return (await response.json()) as GoogleDriveFile;
};

export const getDriveFileContent = async (accessToken: string, fileId: string): Promise<string> => {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to download file from Google Drive (${response.status})`);
  }

  return await response.text();
};

export const deleteDriveFile = async (accessToken: string, fileId: string): Promise<void> => {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Failed to delete file from Google Drive (${response.status})`);
  }
};
