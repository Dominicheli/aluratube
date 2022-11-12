import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(props) {
  const [values, setValues] = React.useState(props.initialValues);

  return {
    values,
    handleChange: (event) => {
      const value = event.target.value;
      const name = event.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },

    clearForm() {
      setValues({});
    },
  };
}

export default function RegisterVideo() {
  const formData = useForm({ initialValues: { title: "", url: "" } });
  const [formVisible, setFormVisible] = React.useState(false);

  return (
    <StyledRegisterVideo>
      <button
        type="button"
        className="add-video"
        onClick={() => setFormVisible(true)}
      >
        +
      </button>
      {formVisible ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setFormVisible(false);
            formData.clearForm();
          }}
        >
          <div>
            <button
              className="close-modal"
              onClick={() => setFormVisible(false)}
            >
              X
            </button>
            <input
              placeholder="Título do vídeo"
              name="title"
              value={formData.values.title}
              onChange={formData.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formData.values.url}
              onChange={formData.handleChange}
            />

            {formData.values.url ? (
              <img
                src={`https://img.youtube.com/vi/${formData.values.url.slice([
                  32,
                ])}/hqdefault.jpg`}
              />
            ) : (
              false
            )}

            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  );
}
