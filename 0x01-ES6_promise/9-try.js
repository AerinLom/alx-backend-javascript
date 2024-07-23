
export default function guardrail(mathFunction) {
  const queue = [];
  
  try {
    const answer = mathFunction();
    queue.push(answer);
  } catch (error) {
    queue.push(`Error: ${error.message}`);
  } finally {
    queue.push('Guardrail was processed');
  }
  
  return queue;
}
