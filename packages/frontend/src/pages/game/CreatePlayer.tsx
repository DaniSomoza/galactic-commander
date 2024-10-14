import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { UniverseType } from 'game-api-microservice/src/types/Universe'
import { RaceType } from 'game-api-microservice/src/types/Race'

import { GAME_DASHBOARD_PATH } from '../../routes/routes'
import { useGameInfo } from '../../store/GameInfoContext'
import Stepper from '../../components/stepper/Stepper'
import Loader from '../../components/loader/Loader'
import { usePlayer } from '../../store/PlayerContext'
import useTaskTracking from '../../hooks/useTaskTracking'

function CreatePlayerPage() {
  const [selectedRace, setSelectedRace] = useState<RaceType>()

  const { selectedUniverse } = useGameInfo()
  const { player, createNewPlayer, createPlayerTaskId } = usePlayer()

  const navigate = useNavigate()

  useEffect(() => {
    if (player) {
      navigate(GAME_DASHBOARD_PATH)
    }
  }, [player, navigate])

  const { isTaskProcessed, stopTaskPolling } = useTaskTracking(createPlayerTaskId)

  useEffect(() => {
    if (isTaskProcessed) {
      stopTaskPolling()
      navigate(GAME_DASHBOARD_PATH)
    }
  }, [isTaskProcessed, stopTaskPolling, navigate])

  const isLoading = !!createPlayerTaskId

  return (
    <Container component="main" maxWidth="xs" disableGutters>
      <Box component="section" marginTop={4}>
        <Paper variant="outlined">
          {!isLoading ? (
            <Stepper
              steps={[
                {
                  label: 'Select universe',
                  content: <SelectUniverseStep />
                },
                {
                  label: 'Select race',
                  content: (
                    <SelectRaceStep selectedRace={selectedRace} setSelectedRace={setSelectedRace} />
                  )
                },
                {
                  label: 'Confirm',
                  content: (
                    <ConfirmAndCreatePlayerStep
                      selectedRace={selectedRace!}
                      selectedUniverse={selectedUniverse!}
                      createPlayer={createNewPlayer}
                    />
                  )
                }
              ]}
              onFinish={() => createNewPlayer(selectedUniverse!.name, selectedRace!.name)}
            />
          ) : (
            <Loader isLoading loadingText="Creating new player..." />
          )}
        </Paper>
      </Box>
    </Container>
  )
}

export default CreatePlayerPage

function SelectUniverseStep() {
  const { selectedUniverse, universes, setSelectedUniverse } = useGameInfo()

  function onSelectUniverse(event: SelectChangeEvent) {
    const universeName = event.target.value
    const selectedUniverse = universes.find((universe) => universe.name === universeName)

    setSelectedUniverse(selectedUniverse)
  }

  if (!selectedUniverse) {
    return <Loader isLoading />
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="select-universe-label">Universe</InputLabel>
      <Select
        labelId="select-universe-label"
        id="universe-select"
        value={selectedUniverse.name}
        label="Universe"
        onChange={onSelectUniverse}
      >
        {universes.map((universe) => (
          <MenuItem value={universe.name} key={universe.name}>
            {universe.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

type SelectRaceStepProps = {
  selectedRace?: RaceType
  setSelectedRace: React.Dispatch<RaceType | undefined>
}

function SelectRaceStep({ selectedRace, setSelectedRace }: SelectRaceStepProps) {
  const { races } = useGameInfo()

  useEffect(() => {
    setSelectedRace(selectedRace || races[0])
  }, [races, selectedRace, setSelectedRace])

  function onSelectRace(event: SelectChangeEvent) {
    const raceName = event.target.value
    const selectedRace = races.find((race) => race.name === raceName)

    setSelectedRace(selectedRace)
  }

  if (!selectedRace) {
    return <Loader isLoading />
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="select-race-label">Race</InputLabel>
      <Select
        labelId="select-race-label"
        id="race-select"
        value={selectedRace.name}
        label="Race"
        onChange={onSelectRace}
      >
        {races.map((race) => (
          <MenuItem value={race.name} key={race.name}>
            {race.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

type ConfirmAndCreatePlayerStepProps = {
  selectedUniverse: UniverseType
  selectedRace: RaceType
  createPlayer: (universeName: string, raceName: string) => void
}

function ConfirmAndCreatePlayerStep({
  selectedUniverse,
  selectedRace,
  createPlayer
}: ConfirmAndCreatePlayerStepProps) {
  return (
    <div>
      <div>Universe: {selectedUniverse.name}</div>
      <div>Race: {selectedRace.name}</div>

      <Stack justifyContent="center" alignItems="center" mt={3}>
        <Button
          variant="contained"
          onClick={() => createPlayer(selectedUniverse.name, selectedRace.name)}
        >
          Create Player
        </Button>
      </Stack>
    </div>
  )
}
