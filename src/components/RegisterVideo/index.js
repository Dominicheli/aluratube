import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.slice([32])}/hqdefault.jpg`;
}

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

const PROJECT_URL = "https://oyhcilksrmtkdkbojbcj.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95aGNpbGtzcm10a2RrYm9qYmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzMzk0MTAsImV4cCI6MTk4MzkxNTQxMH0.rcwAGZB5LTaVLH6FdwjuRaPkgE48ClzIanXIrAruc1M";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

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
            supabase
              .from("video")
              .insert({
                title: formData.values.title,
                url: formData.values.url,
                thumb: getThumbnail(formData.values.url),
                playlist: "favoritos",
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });

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
