import propTypes from "prop-types";
import { createElement } from "react";
import { Controller } from "react-hook-form";

import { styled } from "@mui/material/styles";
import {
  TextField,
  Autocomplete,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Paper,
} from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[8],
  borderRadius: theme.shape.borderRadius,
}));

const OptionSelectField = ({
  name,
  control,
  options,
  errors,
  ...otherProps
}) => {
  const renderOptionItem = (props, option) => {
    switch (name) {
      case "amount":
        return (
          <ListItem {...props} key={option.id}>
            <ListItemAvatar>
              <Avatar
                sx={{
                  width: "3.5rem",
                  height: "3.5rem",
                  color: "green",
                  background: "#fff",
                }}
              >
                +{option.label}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={option.value}
              sx={{ marginLeft: "0.5rem" }}
            />
          </ListItem>
        );
      case "position":
      case "department":
        return (
          <ListItem {...props} key={option.id}>
            <ListItemIcon>{createElement(option.icon)}</ListItemIcon>
            <ListItemText primary={option.label} />
          </ListItem>
        );
      case "category":
      case "winnerType":
        return (
          <ListItem {...props} key={option.id}>
            <ListItemText primary={option.label} />
          </ListItem>
        );
      default:
        return null;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      rules={{
        required: {
          value: true,
          message: `Please select ${name}`,
        },
      }}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          fullWidth
          size="small"
          options={options}
          value={options.find((option) => option.value === value) || null}
          onChange={(_, data) => {
            onChange(data?.value);
          }}
          getOptionLabel={(option) => option?.label || null}
          isOptionEqualToValue={(option) => option.value === value}
          renderOption={renderOptionItem}
          PaperComponent={StyledPaper}
          renderInput={(params) => (
            <TextField
              {...params}
              {...otherProps}
              error={!!errors[name]}
              helperText={errors[name]?.message}
              FormHelperTextProps={{
                style: { color: "red", fontSize: "14px" },
              }}
            />
          )}
        />
      )}
    />
  );
};

OptionSelectField.propTypes = {
  name: propTypes.string,
  control: propTypes.object,
  options: propTypes.array,
  errors: propTypes.object,
};

export default OptionSelectField;
