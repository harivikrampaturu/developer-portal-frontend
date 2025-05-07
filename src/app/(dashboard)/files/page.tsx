'use client'

import FileList from './list/page';
import { 
  AutoFixHigh, 
  NoiseAware, 
  GraphicEq, 
  SurroundSound, 
  Tune, 
  SettingsVoice 
} from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from  'react';
import { StyledCard, IconWrapper, ConfigTitle } from './styled';
import FileUploadModal from '@/components/FileUpload/FileUploadModal';
import { useDispatch } from 'react-redux';
import { setSelectedConfig } from '@/store/upload/uploadSlice';

const voiceConfig = [
  {
    name: 'mvns', 
    label: 'Multi-Variate Noise Suppression', 
    icon: <NoiseAware sx={{ fontSize: 40 }} />
  },
  {
    name: 'bvs', 
    label: 'Background Voice Suppression', 
    icon: <SurroundSound sx={{ fontSize: 40 }} />
  },
/*   {
    name: 'dgc', 
    label: 'Denoise and Gain Control', 
    icon: <GraphicEq sx={{ fontSize: 40 }} />
  },
  {
    name: 'mvnsV5', 
    label: 'Multi-Variate Noise Suppression v5', 
    icon: <AutoFixHigh sx={{ fontSize: 40 }} />
  }, */
  {
    name: 'mvnsAggressive', 
    label: 'Multi-Variate Noise Suppression Aggressive', 
    icon: <Tune sx={{ fontSize: 40 }} />
  },
  {
    name: 'CleanVoice', 
    label: 'Clean Voice', 
    icon: <SettingsVoice sx={{ fontSize: 40 }} />
  }
];



export default function FilesPage() {
    const [view, setView] = useState<'file-list' | 'upload-config'>('upload-config');

    const handleViewChange = (view: 'file-list' | 'upload-config') => {
        setView(view);
    };

    const dispatch = useDispatch<AppDispatch>();

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const handleFileUpload = (name: string) => {
        setIsUploadModalOpen(true);
        dispatch(setSelectedConfig(name));
      }
  return <div>
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      m: 3,
      mb: 4
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 'bold',
          color: 'primary.main' 
        }}
      >
        Files
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => handleViewChange(view === 'file-list' ? 'upload-config' : 'file-list')}
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1
        }}
      >
        {view === 'file-list' ? 'Upload' : 'View Files'}
      </Button>
    </Box>

    {view === 'file-list' && (
      <FileList />
    )}

    {view === 'upload-config' && (
      <Grid container spacing={3} sx={{ px: 3 }}>
        {voiceConfig.map((config) => (
          <Grid item xs={12} sm={6} md={4} key={config.name} onClick={() => {handleFileUpload(config.name)}}>
            <StyledCard>
              <IconWrapper>
                {config.icon}
              </IconWrapper>
              <ConfigTitle variant="h6">
                {config.label}
              </ConfigTitle>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    )}

<FileUploadModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
  </div>
}