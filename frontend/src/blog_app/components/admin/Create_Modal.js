import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useConfirm } from "material-ui-confirm";

const ItemList = () => {
  const confirm = useConfirm();
  const [items, setItems] = useState([
    "React",
    "Material UI",
    "Tea",
    "Coffee",
    "Pancakes"
  ]);
  const handleDelete = item => {
    confirm({ description: `This will permanently delete ${item}.` })
      .then(() => setItems(items.filter(other => other !== item)))
      .catch(() => console.log("Deletion cancelled."));
  };
  return (
    <List>
      {items.map(item => (
        <ListItem key={item}>
          <ListItemText primary={item} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => handleDelete(item)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ItemList;
