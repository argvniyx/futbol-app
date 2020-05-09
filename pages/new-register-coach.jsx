import SideImageForm from '../components/side-image-form'
import UserTextFields from '../components/user-textfields.jsx'
import Horario from '../components/horario.jsx'

export default function RegisterCoach() {
    return (
        <SideImageForm imgPath='register-coach-image.jpg' title="Registro Entrenador">
          <UserTextFields/>
          <Horario/>
        </SideImageForm>
    );
}
