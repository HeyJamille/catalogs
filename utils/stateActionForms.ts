// Tipagem
interface FormState {
  [key: string]: any;
  loading: boolean;
}

export function stateActionForm(state: FormState, action: any): FormState {
  console.log("Formulario: ", state);
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_LOADING":
      return { ...state, loading: action.value };
    case "RESET":
      return action.payload || state;
    default:
      return state;
  }
}
