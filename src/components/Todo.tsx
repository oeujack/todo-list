import { useState } from 'react'
import { ITask } from '../Types'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Modal } from './Modal'
import { Box, Divider } from '@mui/material'
import 'nes.css/css/nes.min.css'
import { toastConfig } from '../utils/toast'
import { toast } from 'react-toastify'

export default function Todo() {
  const [count, setCount] = useState<number>(0)
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<ITask | null>(null)

  function openModal(task: ITask) {
    setSelected(task)
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setSelected(null)
  }

  function updateTask(updatedTask: ITask) {
    setTaskList(
      taskList.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    )
  }

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
      .trim()
      .test('Tarefa já existe', 'Tarefa já existe', function (value) {
        const lowerCaseValue = value.toLowerCase()
        return !taskList
          ?.map((t) => t.task.toLowerCase())
          .includes(lowerCaseValue)
      }),
  })

  function addTask(task: string) {
    const randomId = (num: number) => Math.floor(Math.random() * num)
    const newTask = { id: randomId(999), task: task }
    setTaskList([...taskList, newTask])
  }

  function deleteTask(taskId: number) {
    setTaskList(taskList.filter((t) => t.id !== taskId))
    const name = taskList.find((t) => t.id === taskId)
    console.log(name)
    setCount(count - 1)
    toast.warning(
      <span>
        Tarefa <strong>{name?.task}</strong> removido com sucesso
      </span>,
      {
        ...toastConfig,
      }
    )
  }

  function clearAllTasks() {
    setCount(0)
    setTaskList([])
  }

  return (
    <>
      <Formik
        validationSchema={validate}
        initialValues={{
          nameTask: '',
        }}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          toast.success(
            <span>
              Tarefa <strong>{values.nameTask}</strong> adicionada com sucesso
            </span>,
            {
              ...toastConfig,
            }
          )
          actions.resetForm()
          addTask(values.nameTask)
          setCount(count + 1)
          actions.setSubmitting(false)
        }}
      >
        {({ ...formik }) => (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: { xs: '95vw', sm: '600px', md: '800px' },
                minWidth: '320px',
                width: '100%',
                justifyContent: 'center',
                bgcolor: '#ffffff',
                p: { xs: 2, sm: 3 },
                borderRadius: '15px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <h1>Todo List</h1>
              </Box>

              <Box
                sx={{
                  width: { xs: '100%', sm: '30rem' },
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Escrever tarefa . . ."
                  name="nameTask"
                  className="nes-input"
                  value={formik.values.nameTask}
                  onChange={formik.handleChange}
                  style={{ width: '100%', maxWidth: '400px' }}
                />
                <span className="nes-text is-error">
                  {formik.errors.nameTask}
                </span>
                <button
                  type="submit"
                  onClick={() => formik.handleSubmit()}
                  className="nes-btn is-success"
                >
                  Adicionar
                </button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {taskList.length >= 1 && (
                  <button
                    type="submit"
                    onClick={() => clearAllTasks()}
                    className="nes-btn is-warning"
                  >
                    Limpar tarefas
                  </button>
                )}
                <span>Quantidade de tarefas: {count} </span>
              </Box>

              <Box
                sx={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  scrollbarGutter: 'stable',
                  pr: '5px',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555',
                  },
                }}
              >
                {taskList.map((t, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bgcolor: '#ffffffa8',
                        flexDirection: { xs: 'column', sm: 'row' },
                        boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.1)',
                        p: 1,
                        border: '2px solid black',
                        borderRadius: '15px',
                        mt: 2,
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          textAlign: 'left',
                          wordBreak: 'break-word',
                        }}
                      >
                        <span>{t.task}</span>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                          justifyContent: 'center',
                        }}
                      >
                        <button
                          type="submit"
                          className="nes-btn is-primary"
                          onClick={() => openModal(t)}
                        >
                          Editar
                        </button>
                        <button
                          type="submit"
                          onClick={() => deleteTask(t.id)}
                          className="nes-btn is-error"
                        >
                          X
                        </button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Formik>
      {selected && (
        <Modal
          open={isOpen}
          handleClose={closeModal}
          task={selected}
          updateTask={updateTask}
        />
      )}
    </>
  )
}
