import { Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../config/theme'
import { HeaderComponent } from '../components/HeaderComponent'
import { TextboxComponent } from '../components/TextboxComponent'
import { ButtonComponent } from '../components/ButtonComponent'
import { setItem, getItem } from '../../core/services/local-storage.service'
import { useAlert } from '../hooks/useAlertHook'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ConfigScreen() {
  const [totalCards, setTotalCards] = useState(10)
  const {showAlert} = useAlert()
  const limitCards = Number(process.env.EXPO_PUBLIC_LIMIT_CARDS)

  useEffect(() => {
    loadData()
  }, [])

  // cargar informacion del la configuracion desde el storage
  const loadData = async () => {
    const result = await getItem({key: "totalCards"})
    setTotalCards(Number(result))
  }

  // Guardar configuracion 
  const saveConfiguration = async () => {
    try {
      if(totalCards > limitCards){
        showAlert('Advertencia', `Solo se puede tener un límite de ${limitCards} cartas`)
        setTotalCards(limitCards)
        return;
      }

      await setItem({key: "totalCards", value: totalCards.toString()})
      showAlert('Mensaje', 'Datos almacenados exitosamente')
    } catch (error) {
      showAlert("Error", error)
    }
  }

  return (
    <SafeAreaView style={[globalStyles.container, { alignItems: 'center' }]}>
      <HeaderComponent title='CONFIGURACIÓN' showBackButton={true} showSettingsButton={false} />

      <View style={{gap: 30}}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <Text style={globalStyles.textBoxInput}>TOTAL CARTAS</Text>
          <TextboxComponent keyboardType='number-pad' style={{ width: 100 }} value={totalCards.toString()} onChangeText={setTotalCards} placeholder={totalCards.toString()} />
        </View>

        <ButtonComponent size='large' title='GUARDAR CAMBIOS' onPress={saveConfiguration} />
      </View>
    </SafeAreaView>
  )
}
