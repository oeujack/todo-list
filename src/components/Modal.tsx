import type { ITask } from '../Types'
import './style.css'
import { Box, Dialog } from '@mui/material'
import 'nes.css/css/nes.min.css'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { toastConfig } from '../utils/toast'

interface ModalProps {
  open: boolean
  handleClose: () => void
  task: ITask
  updateTask: (updatedTask: ITask) => void
}

export function Modal({ open, handleClose, task, updateTask }: ModalProps) {
  const validate = Yup.object({
    nameTask: Yup.string()
      .min(5, '* Quantidade mínima: 5')
      .max(18, '* Quantidade máxima: 18')
      .matches(
        // eslint-disable-next-line no-useless-escape
        /^[A-Za-zÀ-ú0-9\s\-]+$/,
        '* Apenas letras e números são permitidos'
      )
      .required('')
      .trim(),
  })

  if (!open) return null

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Formik
        initialValues={{ nameTask: task.task }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          updateTask({ ...task, task: values.nameTask })
          setSubmitting(false)
          handleClose()
          toast.info(
            <span>
              Tarefa <strong>{values.nameTask}</strong> atualizado com sucesso
            </span>,
            {
              ...toastConfig,
            }
          )
        }}
      >
        {({ isSubmitting, ...formik }) => (
          <>
            <Box
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
              className="nes-container"
            >
              <h2 className="nes-text is-primary">Editar Tarefa</h2>

              <input
                name="nameTask"
                type="text"
                className="nes-input"
                value={formik.values.nameTask}
                onChange={formik.handleChange}
                placeholder="Digite sua tarefa"
              />
              <span className="nes-text is-error">
                {formik.errors.nameTask}
              </span>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                  mt: 2,
                }}
              >
                <button
                  type="button"
                  className="nes-btn is-error"
                  onClick={handleClose}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="nes-btn is-success"
                  disabled={isSubmitting}
                  onClick={() => formik.handleSubmit()}
                >
                  Salvar
                </button>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </Dialog>
  )
}
