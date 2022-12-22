export default function Tag({ text, color }) {
  const classes = `text-xs bg-${color}-200 text-${color}-600 font-semibold px-2 py-1 rounded-md ml-3`

  return(
    <span className={classes}>
      {text}
    </span>
  )
}