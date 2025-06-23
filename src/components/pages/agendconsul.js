import styles from './agendconsul.module.css'
import formagend from '../agendamentos/agendamentform'
import AgendamentForm from '../agendamentos/agendamentform'

function Agendamento(){

    return(
        <div className={styles.agendamento}>
            <h1>Agendar Consulta</h1>
            <AgendamentForm />
        </div>

    )
}

export default Agendamento