'use client';

import React from 'react';
import AudioTable from '@/components/Audio/AudioTable';

const RecordingsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Recordings</h1>
      <AudioTable />
    </div>
  );
};

export default RecordingsPage;