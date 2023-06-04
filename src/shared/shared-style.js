import styled from "styled-components";
import Button from "@mui/material/Button";
import { Field } from "formik";

export const StyledButton = styled(Button)`
  margin: 0;
`;

export const StyledListItem = styled.li`
  background: aliceblue;
  border: 1px solid dodgerblue;
  border-radius: 10px;
  padding: 15px;
  margin: 15px;
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
