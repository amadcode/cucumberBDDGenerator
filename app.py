from flask import Flask, render_template, url_for, request

app = Flask(__name__)


# @app.route('/')
# def index4_page():
#     return render_template('voidindex4.html')


@app.route('/', methods=['GET', 'POST'])
def index4_page():
    if request.method == 'POST':
        feature = request.form['featureSteps']
        print(feature)
    return render_template('index4.html')
    # return generate_step_definition()


@app.route('/generate')
def generate_step_definition():
    print('inside generate_step_definition')
    return generate_core_components()


@app.route('/reset')
def reset_page():
    print('inside reset_page method')
    # return render_template('index4.html')


@app.route('/resetJS')
def reset_page_js():
    print('inside reset_page method')
    return render_template('index4.html')


def generate_core_components():
    print('inside core components')
    return render_template('index4.html')
    # return render_template('index.html')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('index4.html')
    # return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True, port=5000)
    # app.run(debug=False, port=5000)
