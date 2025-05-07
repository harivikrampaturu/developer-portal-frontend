import {
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { deleteApiKey } from 'models/apiKeys/thunks';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiKeyItem } from '../styles';
import themeConfig from 'config/theme.config';
import InfoCard from 'common/components/InfoCard';
import {
  ContentCopyOutlined,
  DeleteForeverOutlined,
  KeyOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined
} from '@mui/icons-material';
import { botSelectNameAndIds } from 'models/botManagement/selectors';

const getAssistantName = (id, allAssistants) => {
  const assistant = allAssistants.find((assistant) => assistant._id === id);
  return assistant.name || null;
};

const CardView = ({ title, subheader, apiKeys, isPrivate = false }) => {
  const [visibleKeys, setVisibleKeys] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const stateAssistants = useSelector(botSelectNameAndIds);
  const dispatch = useDispatch();
  const handleDeleteApiKey = (id) => {
    dispatch(deleteApiKey(id));
  };

  const toggleKeyVisibility = (id) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  };
  return (
    <>
      {' '}
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        {apiKeys && apiKeys.length === 0 ? (
          <Typography color='textSecondary'>No keys available.</Typography>
        ) : (
          apiKeys &&
          apiKeys.length > 0 &&
          apiKeys.map(
            ({
              _id,
              name,
              isActive,
              allowedOrigins,
              key,
              isPublic,
              assistants
            }) => (
              <InfoCard
                key={`api-${_id}`}
                status={isActive ? 'Active' : ''}
                title={name || _id}
                style={{
                  border: `1px solid ${themeConfig.palette.border.light}`,
                  borderRadius: `5px`,
                  marginBottom: '1rem'
                }}
                variant={'subtitle1'}
              >
                <ApiKeyItem>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      aria-label='view'
                      size='small'
                      style={{
                        borderRadius: '6px',
                        // border: '1px solid #ccc',
                        transform: 'scale(0.8) rotate(90deg) '
                      }}
                      disabled
                    >
                      <KeyOutlined />
                    </IconButton>
                    <Typography variant='body2' color='textSecondary'>
                      {visibleKeys[_id] ? key : '•'.repeat(40)}
                    </Typography>
                  </div>
                  <div>
                    <IconButton
                      aria-label='view'
                      onClick={() => toggleKeyVisibility(_id)}
                      size='small'
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        transform: 'scale(0.8)'
                      }}
                    >
                      {visibleKeys[_id] ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                    <Tooltip title={isCopied ? 'Copied' : 'Copy ID'} arrow>
                      <IconButton
                        aria-label='copy'
                        onClick={() => {
                          copyToClipboard(key);
                        }}
                        style={{
                          border: '1px solid #ccc',
                          margin: '0 0.3rem ',
                          borderRadius: '6px',
                          transform: 'scale(0.8)'
                        }}
                        size='small'
                      >
                        <ContentCopyOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={'Delete'} arrow>
                      <IconButton
                        aria-label='delete'
                        onClick={() => handleDeleteApiKey(_id)}
                        size='small'
                        style={{
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          transform: 'scale(0.8)'
                        }}
                      >
                        <DeleteForeverOutlined />
                      </IconButton>
                    </Tooltip>
                  </div>
                </ApiKeyItem>
                {isPublic ? (
                  <>
                    <Grid container spacing={1} mt={2}>
                      <Grid item xs={12} md={10} alignSelf={'flex-start'}>
                        <Typography
                          variant='caption'
                          color={themeConfig.palette.text.primary50}
                        >
                          Allowed Origins:
                        </Typography>
                        <Typography variant='body1'>
                          {allowedOrigins && allowedOrigins.length
                            ? allowedOrigins.join(', ')
                            : 'All origins allowed!'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} mt={2}>
                      <Grid item xs={12} md={10} alignSelf={'flex-start'}>
                        <Typography
                          variant='caption'
                          color={themeConfig.palette.text.primary50}
                        >
                          Assistants:
                        </Typography>
                        <Typography variant='body1'>
                          {assistants && assistants.length
                            ? assistants
                                .map(({ id }) =>
                                  getAssistantName(id, stateAssistants)
                                )
                                .join(', ')
                            : 'All Assistants allowed!'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                ) : null}
              </InfoCard>
            )
          )
        )}
      </CardContent>
    </>
  );
};

export default CardView;
