const AddNewScore = testid => {
  let comment_name = '';
  let comment_text = '';
  let formdata = {
    author: comment_name,
    quality: 2,
    completeness: 2,
    hints: 2,
    content: comment_text,
  };

  const questioncomment = (
    <div>
      {' '}
      You can enter new comment here
      <Form
        onSubmit={async () => {
          const id = testid;
          formdata.author = comment_name;
          formdata.content = comment_text;
          const params = {
            commentRecordId: id,
            author: formdata.author,
            quality: formdata.quality,
            hint: formdata.hints,
            completeness: formdata.completeness,
            tags: 'no more comment',
            content: formdata.content,
          };
          console.log(params);
          await createComment(params);
          message.success('Add Overall Score successfully');
        }}
        align={'middle'}
      >
        <Col>
          <Rate
            allowHalf
            onChange={new_val => {
              formdata.quality = new_val;
              console.log(formdata);
            }}
          >
            Code quality
          </Rate>
        </Col>
        <Col>
          <Rate
            allowHalf
            onChange={new_val => {
              formdata.compeleteness = new_val;
              console.log(formdata);
            }}
          >
            Compeleteness
          </Rate>
        </Col>
        <Col>
          <Rate
            onChange={new_val => {
              formdata.hints = new_val;
              console.log(formdata);
            }}
          >
            How much hints
          </Rate>
        </Col>
        <Col>
          <Input
            onChange={e => {
              comment_name = e.target.value;
            }}
          />
          Please leave your name
        </Col>
        <Col>
          <Input
            onChange={e => {
              comment_text = e.target.value;
            }}
          />
          Please leave your comment
        </Col>
        <Button type="primary" htmlType="submit">
          Add a Score
        </Button>
      </Form>
    </div>
  );
  return questioncomment;
};
