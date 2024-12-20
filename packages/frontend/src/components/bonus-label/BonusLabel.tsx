import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

import { percentageBonusType } from 'game-engine/src/engine/bonus/computedBonus'
import { UnitType } from 'game-api-microservice/src/types/Unit'
import { IBonus } from 'game-engine/dist/types/IBonus'

import { useTranslations } from '../../store/TranslationContext'
import Image from '../image/Image'
import getImage from '../../utils/getImage'
import { usePlayer } from '../../store/PlayerContext'

type BonusLabelProps = {
  bonus: UnitType['bonus']
  bono: string
  customValue?: string
}

function BonusLabel({ bono, bonus, customValue }: BonusLabelProps) {
  const { translate } = useTranslations()

  const value = customValue || (bonus[bono as keyof UnitType['bonus']] as number)

  return (
    <BonusToolTip bono={bono} value={value}>
      <Paper
        variant="outlined"
        sx={{ paddingTop: 0.5, paddingBottom: 0.5, paddingLeft: 1, paddingRight: 1 }}
      >
        <Typography fontSize={13} color="success">
          {translate(bono, value)}
        </Typography>
      </Paper>
    </BonusToolTip>
  )
}

export default BonusLabel

type BonusToolTipProps = {
  children: JSX.Element
  bono: string
  value: string | number
}

function BonusToolTip({ children, bono, value }: BonusToolTipProps) {
  const { translate } = useTranslations()

  const { player } = usePlayer()

  const sources = player?.perks.filter((playerPerk) => playerPerk.bonus[bono as keyof IBonus])

  const isPercentageBonus = !!percentageBonusType[bono as keyof typeof percentageBonusType]

  return (
    <Tooltip
      title={
        <Box>
          <Box>{translate(`${bono}_TOOLTIP`, value)}</Box>

          <Stack marginTop={1} direction={'row'} gap={1} justifyContent={'center'}>
            {sources?.map(({ sourceName, bonus }) => (
              <Box key={sourceName} position={'relative'}>
                <Paper variant="outlined">
                  <Image
                    src={getImage(sourceName)}
                    alt={`player bonus source ${sourceName} value: ${value}`}
                    height={'52px'}
                    width={'52px'}
                    border
                  />
                </Paper>

                <Box
                  position={'absolute'}
                  top={'50%'}
                  left={'50%'}
                  sx={{ transform: 'translate(-50%, -50%)' }}
                >
                  <Typography
                    fontSize={18}
                    color={Number(value) > 0 ? 'success' : 'error'}
                    textAlign={'center'}
                    sx={{
                      textShadow:
                        '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, -1px 0px 0 #000, 1px 0px 0 #000, 0px -1px 0 #000, 0px 1px 0 #000;'
                    }}
                  >
                    {Number(value) > 0 ? '+' : '-'}
                    {bonus[bono as keyof IBonus]}
                    {isPercentageBonus ? '%' : ''}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      }
      arrow
    >
      {children}
    </Tooltip>
  )
}
