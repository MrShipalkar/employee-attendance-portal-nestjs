import api from './axios';

export const downloadAttendanceReport =
  async () => {
    const response =
      await api.get(
        '/reports/attendance/download',
        {
          responseType: 'blob',
        },
      );

    const url =
      window.URL.createObjectURL(
        new Blob([response.data]),
      );

    const link =
      document.createElement('a');

    link.href = url;

    link.setAttribute(
      'download',
      'Attendance_Report.xlsx',
    );

    document.body.appendChild(
      link,
    );

    link.click();

    link.remove();
  };

export const downloadLeaveReport =
  async () => {
    const response =
      await api.get(
        '/reports/leaves/download',
        {
          responseType: 'blob',
        },
      );

    const url =
      window.URL.createObjectURL(
        new Blob([response.data]),
      );

    const link =
      document.createElement('a');

    link.href = url;

    link.setAttribute(
      'download',
      'Leave_Report.xlsx',
    );

    document.body.appendChild(
      link,
    );

    link.click();

    link.remove();
  };