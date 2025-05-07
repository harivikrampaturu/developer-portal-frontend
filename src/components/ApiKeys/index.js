import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Switch,
  FormControlLabel,
  Paper,
  Container,
  ToggleButton,
  Typography,
  Chip,
  Tooltip,
  Box,
  FormControl
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { fetchApiKeys, createApiKey } from 'models/apiKeys/thunks';
import {
  selectApiKeysPrivate,
  selectApiKeysPublic,
  selectIsLoading
} from 'models/apiKeys/selectors';
import InfoCard from 'common/components/InfoCard';
import { botSelectNameAndIds } from 'models/botManagement/selectors';
import { fetchOrgBots } from 'models/botManagement/thunks';
import ReactSelect from 'react-select';
import { CustomChipStyle, customStyles, Header, ToggleTabs } from './styles';
import CardView from './List';
import themeConfig from 'config/theme.config';
import { Close as CloseIcon } from '@mui/icons-material';
import { userSelectLoggedInTeamName } from 'models/user/selectors';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import PublicIcon from '@mui/icons-material/Public';
import { StyledTypography } from 'common/styles/shared';
import { GroupInput } from 'pages/KnowledgeBase/styles';

export default function ApiKeysManager() {
  const dispatch = useDispatch();
  const privateKeys = useSelector(selectApiKeysPrivate);
  const publicKeys = useSelector(selectApiKeysPublic); // Get API keys from the store
  const isLoading = useSelector(selectIsLoading); // Get loading state
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const [selectedAssistants, setSelectedAssistants] = useState([]);
  const [allowedOrigins, setAllowedOrigins] = useState([]);
  const [hasPublicAccess, setHasPublicAccess] = useState(false);
  const [inputValue, setInputValue] = useState(''); // Current input value
  const [error, setError] = useState(false); // Validation error state
  const [apiName, setApiName] = useState('');

  // Regular expression for validating URLs
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  const handleAddOrigin = () => {
    if (!inputValue) {
      setError(false);
      return false;
    }
    if (urlRegex.test(inputValue.trim())) {
      setAllowedOrigins([...allowedOrigins, inputValue.trim()]);
      setInputValue(''); // Clear input
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleRemoveOrigin = (originToRemove) => {
    setAllowedOrigins(
      allowedOrigins.filter((origin) => origin !== originToRemove)
    );
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddOrigin();
    }
  };

  const assistants = useSelector(botSelectNameAndIds);
  const orgName = useSelector(userSelectLoggedInTeamName);

  const assistantOptions = assistants.map(({ id, name }) => ({
    value: id,
    label: name
  }));

  useEffect(() => {
    dispatch(fetchOrgBots());
  }, [dispatch]);

  const handleAssistantChange = (selectedOptions) => {
    setSelectedAssistants(selectedOptions || []);
  };

  useEffect(() => {
    dispatch(fetchApiKeys());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    if (newValue !== null) setTabValue(newValue);
  };

  const handleCreateApiKey = async (event) => {
    event.preventDefault();

    const name = apiName;
    const payload = {
      name,
      allowedOrigins,
      assistants: selectedAssistants.map(({ value }) => value) || [],
      isPublic: Boolean(hasPublicAccess)
    };
    dispatch(createApiKey(payload)).then(() => {
      setIsCreateDialogOpen(false);
    });
  };

  const handleReset = () => {
    setApiName('');
    setAllowedOrigins([]);
    setInputValue('');
    setError(false);
    setSelectedAssistants([]);
  };

  return (
    <Paper style={{ margin: '1.6rem', borderRadius: '12px' }}>
      <Header>
        <Typography variant='h6'>{orgName}</Typography>
        <Button
          variant='contained'
          color='primary'
          startIcon={<Add />}
          onClick={() => setIsCreateDialogOpen(true)}
        >
          Add Key
        </Button>
      </Header>

      <Container style={{ paddingBottom: '1.6rem' }}>
        <ToggleTabs
          value={tabValue}
          exclusive
          onChange={handleTabChange}
          aria-label='API Key Type'
        >
          <ToggleButton value={0} aria-label='Private Key'>
            <VpnLockIcon fontSize='small' />{' '}
            <StyledTypography style={{ marginLeft: '0.3rem' }}>
              Private
            </StyledTypography>
          </ToggleButton>
          <ToggleButton value={1} aria-label='Public Key'>
            <PublicIcon fontSize='small' />{' '}
            <StyledTypography style={{ marginLeft: '0.3rem' }}>
              Public
            </StyledTypography>
          </ToggleButton>
        </ToggleTabs>

        <div role='tabpanel' hidden={tabValue !== 0} id='api-tabpanel-0'>
          {tabValue === 0 && (
            <Card>
              <CardView
                title='Private Keys'
                subheader='Use your Private API Keys to interact with our APIs via your Backend Systems.'
                apiKeys={privateKeys}
              />
            </Card>
          )}
        </div>

        <div role='tabpanel' hidden={tabValue !== 1} id='api-tabpanel-1'>
          {tabValue === 1 && (
            <Card>
              <CardView
                title='Public Keys'
                subheader='Use Public API Keys for client-side applications.'
                apiKeys={publicKeys}
              />
            </Card>
          )}
        </div>
      </Container>

      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      >
        <DialogTitle>
          <Typography variant='h6'>New API Key</Typography>
          <Typography variant='caption'>
            {' '}
            Add a new API Key to restrict access
          </Typography>
        </DialogTitle>
        <DialogContent>
          <InfoCard
            style={{
              background: themeConfig.palette.background.light,
              borderRadius: '8px',
              minWidth: '40rem'
            }}
          >
            <GroupInput>
              <FormControl fullWidth>
                <TextField
                  value={apiName}
                  onChange={(e) => {
                    setApiName(e.target.value);
                  }}
                  autoFocus
                  id='name'
                  name='name'
                  label='API Key Name'
                  type='text'
                  fullWidth
                  variant='outlined'
                  required
                />
              </FormControl>
            </GroupInput>
            <FormControlLabel
              control={
                <Switch
                  color='primary'
                  onChange={() => {
                    setHasPublicAccess(!hasPublicAccess);
                  }}
                  checked={Boolean(hasPublicAccess)}
                />
              }
              label='Public Access'
            />

            {hasPublicAccess && (
              <GroupInput>
                <FormControl fullWidth>
                  <Box>
                    <Box display='flex' alignItems='center' gap={1}>
                      <Tooltip title='Enter a valid regex URL and press Enter or blur out to add'>
                        <TextField
                          label='Allowed URLs'
                          placeholder='https://example.com'
                          variant='outlined'
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleInputKeyDown}
                          onBlur={handleAddOrigin}
                          error={error}
                          helperText={
                            error ? 'Please enter a valid regex URL' : ''
                          }
                          fullWidth
                        />
                      </Tooltip>
                    </Box>

                    {/* Chips Container */}
                    {allowedOrigins && allowedOrigins.length ? (
                      <Box
                        display='flex'
                        flexWrap='wrap'
                        gap={1}
                        mt={1}
                        style={{ border: '1px solid #ddd', padding: '1rem' }}
                      >
                        {allowedOrigins.map((origin, index) => (
                          <Chip
                            key={index}
                            label={origin}
                            onDelete={() => handleRemoveOrigin(origin)}
                            deleteIcon={<CloseIcon />}
                            sx={CustomChipStyle}
                          />
                        ))}
                      </Box>
                    ) : null}
                  </Box>
                </FormControl>
              </GroupInput>
            )}

            {hasPublicAccess && (
              <ReactSelect
                labelId='assistant-label'
                id='assistants'
                name='assistants'
                options={assistantOptions}
                onChange={handleAssistantChange}
                value={selectedAssistants}
                placeholder='Select Assistants'
                isMulti
                isClearable
                styles={{
                  ...customStyles,
                  menuPortal: (base) => ({ ...base, zIndex: 9999 })
                }}
                menuPortalTarget={document.body}
              />
            )}
          </InfoCard>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleReset();
              setIsCreateDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type='button'
            variant='contained'
            color='primary'
            disabled={isLoading}
            onClick={handleCreateApiKey}
          >
            {isLoading ? 'Creating...' : 'Create  Token'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
