import { useState } from 'react'
import Box from '@mui/material/Box'
import StepperMUI from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

type StepType = {
  label: string
  content: JSX.Element | JSX.Element[]
}

type StepperProps = {
  steps: StepType[]
  onFinish: () => void
}

function Stepper({ steps, onFinish }: StepperProps) {
  const [activeStep, setActiveStep] = useState(0)

  function onNextStep() {
    setActiveStep((activeStep) => {
      const isLastStep = activeStep === steps.length - 1

      return isLastStep ? activeStep : activeStep + 1
    })
  }

  function onPreviousStep() {
    setActiveStep((activeStep) => {
      const isFirstStep = activeStep === 0

      return isFirstStep ? 0 : activeStep - 1
    })
  }

  const isLastStep = activeStep === steps.length - 1
  const isFirstStep = activeStep === 0

  return (
    <Box padding={2}>
      <StepperMUI activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </StepperMUI>

      {/* Active step content */}
      <Box padding={2} paddingTop={4}>
        {steps[activeStep].content}
      </Box>

      {/* Button section */}
      <Stack direction="row" justifyContent="flex-end">
        {!isFirstStep && <Button onClick={onPreviousStep}>Back</Button>}

        {isLastStep ? (
          <Button onClick={onFinish}>Finish</Button>
        ) : (
          <Button onClick={onNextStep}>Next</Button>
        )}
      </Stack>
    </Box>
  )
}

export default Stepper
