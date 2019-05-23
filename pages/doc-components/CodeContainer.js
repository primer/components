import React from 'react'
import {LiveCode as MDXLive} from 'mdx-live'
import copy from 'clipboard-copy'

import {Relative, Absolute, Button, StyledOcticon} from '../..'
import {Clippy, Check} from '@githubprimer/octicons-react'

function CodeContainer({children: code, className: language}) {
  if (language === 'language-.jsx') return <LiveCode initialCode={code} />
  else return <StaticCode code={code} />
}

function LiveCode({initialCode}) {
  const [code, setCode] = React.useState(initialCode)

  return (
    <Relative>
      <MDXLive code={code} editorProps={{onChange: code => setCode(code)}} />
      <CopyButton code={code} />
    </Relative>
  )
}

function StaticCode({code}) {
  return (
    <Relative>
      <pre>{code}</pre>
      <CopyButton code={code} />
    </Relative>
  )
}

/* Totally magic number based on what feels-right™ */
const COPY_RESET_TIME = 1500

function CopyButton({code}) {
  const [copied, setCopied] = React.useState(false)

  function onClick() {
    copy(code)
    setCopied(true)
  }

  /* Reset copied icon after some time */
  React.useEffect(
    function() {
      setTimeout(function() {
        if (copied) setCopied(false)
      }, COPY_RESET_TIME)
    },
    [copied]
  )

  return (
    <Absolute right={8} bottom={8}>
      <Button onClick={onClick}>
        <StyledOcticon icon={copied ? Check : Clippy} color={copied ? 'green.5' : 'inherit'} />
      </Button>
    </Absolute>
  )
}

export default CodeContainer
