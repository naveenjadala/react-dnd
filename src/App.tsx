import TypeListComponent from './TypeListComponent'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import FormBuilderComponent from './FormBuilderComponent'

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <h1>Drag and Drop</h1>
      <TypeListComponent />
      <FormBuilderComponent />
    </DndProvider>
  )
}

export default App
