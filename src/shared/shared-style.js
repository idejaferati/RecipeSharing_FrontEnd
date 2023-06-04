import styled from "styled-components";
import Button from "@mui/material/Button";
import { Field, ErrorMessage } from "formik";

export const StyledButton = styled(Button)`
  margin: 0;
`;

export const StyledListItem = styled.li`
  background: aliceblue;
  border: 1px solid dodgerblue;
  border-radius: 10px;
  padding: 15px;
  margin: 15px 0;
`;

export const StyledInput = styled.input`
  height: 30px;
`;

export const StyledField = styled(Field)`
  height: 30px;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

export const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  margin-top: 5px;
`;
