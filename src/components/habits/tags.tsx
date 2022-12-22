import Tag from "./tag";

export default function Tags({ tags }) {
  return tags.map(tag => (
    <Tag key={tag.name} text={tag.name} color={tag.color.toLowerCase()} />
  ))
}