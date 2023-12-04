import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

export default function Input({ mask = '', maskChar = '', formatChars, variant = 'outlined', value='', onChange = () => 0, width, background, events, ...props }) {
  return (mask || maskChar) ? (
    <InputMask  mask={mask} maskChar={maskChar} value={value} onChange={onChange} {...(formatChars && { formatChars })}>
      {() => <StyledTextField {...props} variant={variant} width={width} background={background} events={events}/>}
    </InputMask>
  ) : (
    <StyledTextField {...props} value={value} onChange={onChange} variant={variant} width={width} background={background} events={events}/>
  );
}

const StyledTextField = styled(TextField)`
  
  margin-top: 8px !important;
  background-color: ${(props) => props.background || 'initial'};
  pointer-events: ${(props) => props.events || 'initial'};
  width: ${(props) => props.width || 'auto'};

  & .MuiFormLabel-root {
    color: #02131b !important;  // Altere para a cor desejada para o label no estado padrão
  }
  & .MuiInputBase-input {
    color: #171717 !important; // Altere para a cor que você deseja para a fonte no estado padrão
  }  
  // Alterar a cor da borda no estado padrão
  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: #02131b; // Altere para a cor que você deseja no estado padrão
  }

  & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: #6CA7C2; // Altere para a cor da borda que você deseja no hover
  }

  & .MuiOutlinedInput-root:hover .MuiInputBase-input {
    color: #171717; // Altere para a cor da fonte que você deseja no hover
  }

  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #6CA7C2; // Altere para a cor que você deseja quando o input está em foco
  }

  & .MuiInputLabel-root.Mui-focused {
    color: #6CA7C2;  // Altere para a cor que você deseja quando o rótulo está focado
  }
`;