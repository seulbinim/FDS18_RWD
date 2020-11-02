function ellipsisText(text, limitCount) {
  if (text.length > limitCount) {
    return text.slice(0, limitCount - 1) + '...';
  }
  return text;
}
