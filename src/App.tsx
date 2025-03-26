import { useState } from 'react'

import './App.css'
import { Button } from './components/atoms/button/button'
import { Header } from './components/organisms/header/header'
import { Card } from './components/molecules/card/card'
import { Movimientos } from './components/movimientos'

function App() {
  //const [count, setCount] = useState(0)

  const[movemnts]= useState<Movimientos[]>([
    {
      type: 'Nomina',
      numero: '18/03/2025',
      monto: '€2500.00',
      signo:'+'

    },
    {
      type: 'Pago Luz',
      numero: '17/03/2025',
      monto: '€89.50',
      signo:'-'

    },
    {
      type: 'Transferencia',
      numero: '17/03/2025',
      monto: '€250.00',
      signo:'-'

    },
    {
      type: 'Devolución',
      numero: '17/03/2025',
      monto: '€42.30',
      signo:'+'
    }
  ])

  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount(cantidad => (cantidad == 3 ? movemnts.length: 3)); // Mostrar todos los movimientos
  };

  return (
    <>

      <Header>
        Mi Banco Digital
      </Header>

      <Card cuenta='N°**7890' monto='€5842.75' type='Cuenta Corriente' actualizacion='Actualizado 18/03/2025'>
        Resumen de cuentas
      </Card>
      
      <Card items={movemnts} visibleCount={visibleCount}>
        Últimos Movimientos
      </Card>
      <Button onClick={handleShowMore} >
        Ver todos los movimientos
      </Button>


    </>
  )
}

export default App
