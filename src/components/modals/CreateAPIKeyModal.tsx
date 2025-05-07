import { Dialog, DialogContent, DialogTitle, TextField, Button, Chip, Switch } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAPIKey } from "@/store/apiKeys/apiKeysThunks";
import { AppDispatch } from "@/store";

interface CreateAPIKeyModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateAPIKeyModal({ open, onClose }: CreateAPIKeyModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [newKeyName, setNewKeyName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [allowedOrigins, setAllowedOrigins] = useState('');
  const [urlChips, setUrlChips] = useState<string[]>([]);
  const [error, setError] = useState(false); 

  console.log(allowedOrigins)
  
  const isValidUrl = (url: string) => {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlRegex.test(url);
  };

  const handleSubmit = async () => {
    await dispatch(createAPIKey({
      name: newKeyName,
      isPublic,
      allowedOrigins: urlChips,
    }));
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNewKeyName('');
    setIsPublic(false);
    setAllowedOrigins('');
    setUrlChips([]);
  };

  const handleAddUrl = () => {
    if (allowedOrigins.trim() && isValidUrl(allowedOrigins.trim()) && !urlChips.includes(allowedOrigins.trim())) {
      setUrlChips((prev) => [...prev, allowedOrigins.trim()]);
      setAllowedOrigins('');
      setError(false); 
    } else {
      setError(true);
    }
  };

  const handleRemoveUrl = (url: string) => {
    setUrlChips(urlChips.filter((chip) => chip !== url));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddUrl();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogTitle>New API Key</DialogTitle>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium p-2">API Key Name</label>
            <TextField
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter key name"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <label className="text-sm font-medium">Public Access</label>
          </div>

          {/* Conditionally render Allowed URLs field based on isPublic state */}
          {!isPublic && (
            <div className="space-y-2">
              <label className="text-sm font-medium p-2">Allowed URLs</label>
              <TextField
                value={allowedOrigins}
                onChange={(e) => setAllowedOrigins(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter allowed URLs"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                error={error}
                helperText={error ? 'Please enter a valid URL' : ''}
              />
              { (urlChips.length != 0) && <div className="mt-2 flex flex-wrap gap-2 border border-gray-400 p-2 rounded-md">
              {urlChips.map((url, index) => (
                <Chip
                  key={index}
                  label={url}
                  onDelete={() => handleRemoveUrl(url)}
                  sx={{ margin: '2px' }}
                />
              ))}
              </div>}
              </div>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Token
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
