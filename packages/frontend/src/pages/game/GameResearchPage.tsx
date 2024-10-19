import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

import researchPlaceholder from '../../assets/research_placeholder.jpg'
import { usePlayer } from '../../store/PlayerContext'
import Loader from '../../components/loader/Loader'
import formatTimer from '../../utils/formatTimer'
import { startResearch, updateResearchQueue } from '../../endpoints/game/researchEndpoint'
import { useGameInfo } from '../../store/GameInfoContext'

function GameResearchPage() {
  const { player, isPlayerLoading } = usePlayer()
  const { selectedUniverse } = useGameInfo()

  if (!player || isPlayerLoading) {
    return <Loader isLoading />
  }

  const { researches } = player.race
  const { queue: researchQueue, activeResearch } = player.researches

  console.log('researches: ', researches)
  console.log('researchQueue: ', researchQueue)

  return (
    <Stack direction={'column'} gap={1}>
      {researches.map((research) => (
        // TODO: search the playerResearch to see the actual values
        <Paper key={research.name} variant="outlined">
          <Stack direction={'row'}>
            {/* Image Part */}
            <Box sx={{ position: 'relative' }}>
              <Stack justifyContent="center" alignItems="center">
                <img
                  src={researchPlaceholder}
                  // TODO: create proper alt image
                  alt="player active research image"
                  height={'200px'}
                  width={'200px'}
                  style={{ borderRadius: '4px 0px 0px 4px' }}
                />
                {/* Research time */}
                <Box position={'absolute'} left={0} bottom={0} padding={1}>
                  <Paper variant="outlined">
                    {/* {TODO: calculate duration based on the level} */}
                    <Tooltip
                      title={`Research duration: ${formatTimer(research.initialTime)}`}
                      arrow
                    >
                      <Typography
                        variant="body1"
                        fontSize={12}
                        fontWeight={500}
                        padding={0.4}
                        paddingLeft={0.8}
                        paddingRight={0.8}
                      >
                        {formatTimer(research.initialTime)}
                      </Typography>
                    </Tooltip>
                  </Paper>
                </Box>

                {/* Research level */}
                <Box position={'absolute'} right={0} bottom={0} padding={1}>
                  <Paper variant="outlined">
                    <Stack
                      padding={0.4}
                      paddingLeft={0.8}
                      paddingRight={0.8}
                      direction={'row'}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="body1" fontSize={12} fontWeight={500}>
                        {activeResearch?.level}
                      </Typography>
                    </Stack>
                  </Paper>
                </Box>
              </Stack>
            </Box>

            {/* Text Part */}
            <Stack padding={1.5} flexGrow={1}>
              <Typography fontSize={14} overflow={'hidden'} textOverflow="ellipsis">
                {research.name}
              </Typography>

              <Typography fontSize={14} overflow={'hidden'} textOverflow="ellipsis" flexGrow={1}>
                Description: {research.description}
              </Typography>

              <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
                <Button variant="outlined" size="small">
                  {'Schedule'}
                </Button>
                {activeResearch ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={
                      () =>
                        updateResearchQueue(
                          [...researchQueue, research.name],
                          selectedUniverse!.name
                        )
                      // TODO: ADD LOADING STATE!
                    }
                  >
                    {'Add to Queue'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    // TODO: ADD LOADING STATE!
                    onClick={() => startResearch(research.name, selectedUniverse!.name)}
                  >
                    {'Research'}
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Stack>
  )
}

export default GameResearchPage
