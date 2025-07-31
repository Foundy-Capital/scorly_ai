'use client';

interface ErrorNotificationProps {
  message: string;
}

export const ErrorNotification = ({ message }: ErrorNotificationProps) => {
  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
      <strong>Error:</strong> {message}
    </div>
  );
};
