'use client';

import React from 'react';
import AudioTable from '@/components/Audio/AudioTable';

const AudioPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Audio Files</h1>
      <AudioTable />
    </div>
  );
};

export default AudioPage;