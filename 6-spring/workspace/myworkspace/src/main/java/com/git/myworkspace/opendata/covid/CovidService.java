package com.git.myworkspace.opendata.covid;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

// ���� ������Ʈ
// 1. �ܺ� �ý��� ���
// 2. ������ Ʈ����� ó��
@Service
public class CovidService {

	private final String SERVICE_KEY = "IfcuH7lGQKchQgb97KnrXaH73w3PuD6Rwg295YWGvEmkvYlEfw7xdCtU%2FFnPZ0ju0BamQKp2YjoxiIzV96MXSw%3D%3D";

	private CovidHourRepository repo;

	@Autowired
	public CovidService(CovidHourRepository repo) {
		this.repo = repo;
	}

	@Scheduled(fixedRate = 1000 * 60 * 60 * 1)
	// 1000 * 60 * 60 * 1
	public void requestCovid() throws IOException {
		String[] gubunNames = { "����" };
		for (String gubunName : gubunNames) {
			requestCovidHour(gubunName);
		}
	}

	@SuppressWarnings("deprecation")
	public void requestCovidHour(String gubun) throws IOException {
		System.out.println(new Date().toLocaleString());

		/* ---------------------- ������ ��û�ϰ� XML �޾ƿ��� ���� ----------------- */

		// �̷��� ���;� ��
// http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?pageNo=1&numOfRows=10&endCreateDt=20200410&serviceKey=IfcuH7lGQKchQgb97KnrXaH73w3PuD6Rwg295YWGvEmkvYlEfw7xdCtU%2FFnPZ0ju0BamQKp2YjoxiIzV96MXSw%3D%3D
// http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=IfcuH7lGQKchQgb97KnrXaH73w3PuD6Rwg295YWGvEmkvYlEfw7xdCtU%2FFnPZ0ju0BamQKp2YjoxiIzV96MXSw%3D%3D
		// &pageNo=1&numOfRows=10&startCreateDt=20200410&endCreateDt=20200410
		// serviceKey=����Ű(URL Encode)
		// &pageNo=1&numOfRows=10&startCreateDt=20200410&endCreateDt=20200410
		// StringBuilder ���ڿ��� ����������� �����ϴ� Ŭ����
		// 1. ��û URL �����
		StringBuilder builder = new StringBuilder();
		builder.append("http://openapi.data.go.kr/openapi");
		builder.append("/service");
		builder.append("/rest");
		builder.append("/Covid19");
		builder.append("/getCovid19SidoInfStateJson");
		builder.append("?pageNo=1&numOfRows=10");
		builder.append("&startCreateDt=20200410");
		builder.append("&endCreateDt=20200410");
		builder.append("&serviceKey=" + SERVICE_KEY); // ����Ű

		System.out.println(builder.toString());

		// 2. URL ��ü ����
		URL url = new URL(builder.toString());

		// 3. Http ���� ����
		HttpURLConnection con = (HttpURLConnection) url.openConnection();

		// 4. byte[]�迭�� �����͸� �о��
		byte[] result = con.getInputStream().readAllBytes();

		// 5. byte[] -> ���ڿ�(XML) ��ȯ
		String data = new String(result, "UTF-8");
//		System.out.println(data);
		/* ---------------------- ������ ��û�ϰ� XML �޾ƿ��� �� ----------------- */

		/* ---------------------- XML -> JSON -> Object(Java) ���� ----------------- */
		// XML(���ڿ�) -> JSON(��ü)
		JSONObject jsonObj = XML.toJSONObject(data);
		// JSON(��ü) -> JSON(���ڿ�)
		String json = jsonObj.toString(2);
//		System.out.println(json);

		// JSON(���ڿ�) -> Java(object)
		CovidHourResponse response = new Gson().fromJson(json, CovidHourResponse.class);
		System.out.println(response);

//		// ������ ������
//		CovidHourResponse.Item item = response.getResponse().getBody().getItems().getItem().get(1);
//		System.out.println(item);
		/* ---------------------- XML -> JSON -> Object(Java) �� ----------------- */

		/* ---------------------- ���� ��ü -> ��ƼƼ ���� ----------------- */
		List<CovidHour> list = new ArrayList<CovidHour>();
		for (CovidHourResponse.Item item : response.getResponse().getBody().getItems().getItem()) {
			CovidHour record = CovidHour.builder().stdDay(item.getStdDay()).gubun(item.getGubun())
					.defCnt(item.getDefCnt()).incDec(item.getIncDec()).isolIngCnt(item.getIsolIngCnt())
					.isolClearCnt(item.getIsolClearCnt()).overFlowCnt(item.getOverFlowCnt())
					.deathCnt(item.getDeathCnt()).build();

			list.add(record);
		}
		/* ---------------------- ���� ��ü -> ��ƼƼ �� ----------------- */

		/* ---------------------- ��ƼƼ��ü -> �������͸��� ���� ���� ----------------- */
		repo.saveAll(list);
		/* ---------------------- ��ƼƼ��ü -> �������͸��� ���� �� ----------------- */
	}
}
