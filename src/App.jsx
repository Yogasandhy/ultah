import { useState } from 'react'
import { motion } from 'framer-motion'
import './index.css'
import IntroScreen from './components/Stage0_5_Intro/IntroScreen'
import LoadingScreen from './components/Stage1_Loading/LoadingScreen'
import DiaryScreen from './components/Stage1_25_Diary/DiaryScreen'
import PasscodeScreen from './components/Stage1_5_Gatekeeper/PasscodeScreen'
import EntranceScreen from './components/Stage2_Entrance/EntranceScreen'
import ReasonScreen from './components/Stage2_5_Reasons/ReasonScreen'
import PuzzleScreen from './components/Stage2_75_Puzzle/PuzzleScreen'
import GalleryScreen from './components/Stage3_Gallery/GalleryScreen'
import QuizScreen from './components/Stage3_5_Quiz/QuizScreen'
import BucketListScreen from './components/Stage3_75_BucketList/BucketListScreen'
import GachaScreen from './components/Stage4_Gacha/GachaScreen'
import WishScreen from './components/Stage4_5_Wish/WishScreen'
import ConstellationScreen from './components/Stage4_75_Constellation/ConstellationScreen'
import CakeScreen from './components/Stage5_Cake/CakeScreen'
import LayoutWrapper from './components/shared/LayoutWrapper'
import { AnimatePresence } from 'framer-motion'

/*
  Stage Flow (14 stages):
  0.5   -> Intro (cinematic text reveal)
  1     -> Fake Loading
  1.25  -> Secret Diary (typewriter entries)
  1.5   -> Gatekeeper (passcode)
  2     -> Entrance (reject 7x then YES rain)
  2.5   -> 10 Reasons Why I Love You
  2.75  -> Puzzle Hati (drag-swap jigsaw)
  3     -> Memory Lane (Gallery)
  3.5   -> Love Quiz
  3.75  -> Bucket List (couple goals)
  4     -> Gacha Wish
  4.5   -> Star Wishes
  4.75  -> Constellation Map (draw heart in stars)
  5     -> Grand Finale (Cake + Envelope + Letter)
*/

function App() {
  const [stage, setStage] = useState(0.5)

  const STAGE_ORDER = [0.5, 1, 1.25, 1.5, 2, 2.5, 2.75, 3, 3.5, 3.75, 4, 4.5, 4.75, 5];

  const nextStage = () => {
    const currentIdx = STAGE_ORDER.indexOf(stage);
    if (currentIdx < STAGE_ORDER.length - 1) {
      setStage(STAGE_ORDER[currentIdx + 1]);
    }
  }

  return (
    <LayoutWrapper>
      <AnimatePresence mode="wait">
        {stage === 0.5 && (
          <StageWrapper key="intro">
            <IntroScreen onNext={nextStage} />
          </StageWrapper>
        )}
        {stage === 1 && (
          <StageWrapper key="loading">
            <LoadingScreen onComplete={nextStage} />
          </StageWrapper>
        )}
        {stage === 1.25 && (
          <StageWrapper key="diary">
            <DiaryScreen onNext={nextStage} />
          </StageWrapper>
        )}
        {stage === 1.5 && (
          <StageWrapper key="gatekeeper">
            <PasscodeScreen onNext={nextStage} />
          </StageWrapper>
        )}
        {stage === 2 && (
          <StageWrapper key="entrance">
            <EntranceScreen onNext={nextStage} />
          </StageWrapper>
        )}
        {stage === 2.5 && (
          <StageWrapper key="reasons">
            <ReasonScreen onNext={nextStage} />
          </StageWrapper>
        )}
        {stage === 2.75 && (
          <StageWrapper key="puzzle">
            <PuzzleScreen onNext={nextStage} />
          </StageWrapper>
        )}
        {stage === 3 && (
          <StageWrapper key="gallery">
            <GalleryScreen onNext={nextStage} />
          </StageWrapper>
        )}
        {stage === 3.5 && (
          <StageWrapper key="quiz">
            <QuizScreen onNext={nextStage} />
          </StageWrapper>
        )}
        {stage === 3.75 && (
          <StageWrapper key="bucketlist">
            <BucketListScreen onNext={nextStage} />
          </StageWrapper>
        )}
        {stage === 4 && (
          <StageWrapper key="gacha">
            <GachaScreen onNext={nextStage} />
          </StageWrapper>
        )}
        {stage === 4.5 && (
          <StageWrapper key="wish">
            <WishScreen onNext={nextStage} />
          </StageWrapper>
        )}
        {stage === 4.75 && (
          <StageWrapper key="constellation">
            <ConstellationScreen onNext={nextStage} />
          </StageWrapper>
        )}
        {stage === 5 && (
          <StageWrapper key="cake">
            <CakeScreen />
          </StageWrapper>
        )}
      </AnimatePresence>
    </LayoutWrapper>
  )
}

// Wrapper for transition animations
const StageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.1 }}
    transition={{ duration: 0.5 }}
    style={{ width: '100%', height: '100%' }}
  >
    {children}
  </motion.div>
)

export default App
