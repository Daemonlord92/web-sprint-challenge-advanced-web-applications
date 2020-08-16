import React, { useState } from "react";
import axios from "axios";
import Col from "reactstrap/es/Col";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
        .put("/colors/${colorToEdit.id}", colorToEdit)
        .then(r => {
          updateColors(colors.map(color => {
            if (colorToEdit.id === color.id) {
              return r.data;
            }
            return color;
          }))
        } )
        .catch(err => console.log(err, 'MJM:ColorList Err'))
  };

  const deleteColor = color => {
    axiosWithAuth()
        .delete(`/api/colors/${color.id}`)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    updateColors(colors.filter(col => {
      return col.id !== color.id;
    }))
  };

  return (
      <Col className="colors-wrap">
        <p>colors</p>
        <ul>
          {colors.map(color => (
              <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                  x
              </span>{" "}
              {color.color}
            </span>
                <div
                    className="color-box"
                    style={{ backgroundColor: color.code.hex }}
                />
              </li>
          ))}
        </ul>
        {editing && (
            <form onSubmit={saveEdit}>
              <legend>edit color</legend>
              <label>
                color name:
                <input
                    onChange={e =>
                        setColorToEdit({ ...colorToEdit, color: e.target.value })
                    }
                    value={colorToEdit.color}
                />
              </label>
              <label>
                hex code:
                <input
                    onChange={e =>
                        setColorToEdit({
                          ...colorToEdit,
                          code: { hex: e.target.value }
                        })
                    }
                    value={colorToEdit.code.hex}
                />
              </label>
              <div className="button-row">
                <button type="submit">save</button>
                <button onClick={() => setEditing(false)}>cancel</button>
              </div>
            </form>
        )}
        <div className="spacer" />
        {/* stretch - build another form here to add a color */}
      </Col>
  );
};

export default ColorList;
