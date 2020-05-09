import SideImageForm from '../components/side-image-form'
import UserTextFields from '../components/user-textfields'

export default function RegisterParent() {
    return (
        <SideImageForm imgPath="register-user-image.jpg" title="Registro">
          <UserTextFields/>
        </SideImageForm>
    );
}
