import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IProfileInfoActionsProps } from '@/types/profile'
import styles from '@/styles/profile/index.module.scss'

const ProfileInfoActions = ({
  spinner,
  handleSaveInfo,
  disabled,
  handleCancelEdit,
}: IProfileInfoActionsProps) => (
  <div className={styles.profile__info__actions}>
    <button
      className={`btn-reset ${styles.profile__info__save} ${
        spinner ? styles.profile__info__save_spinner : ''
      }`}
      onClick={handleSaveInfo}
      disabled={disabled}
    >
      {spinner ? <FontAwesomeIcon icon={faSpinner} spin /> : <span />}
    </button>
    <button
      className={`btn-reset ${styles.profile__info__close}`}
      onClick={handleCancelEdit}
    />
  </div>
)

export default ProfileInfoActions
